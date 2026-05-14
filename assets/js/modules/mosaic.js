/**
 * Hero portrait Rubik's solve.
 *
 * A full six-face Rubik's cube state lives in JS: 54 stickers, each tagged
 * by face, row, col, and an in-plane orientation. We scramble the cube with
 * N random face turns, then play the inverse sequence to solve it.
 *
 * Only the front face is rendered, as a flat 3x3 grid of nine stickers. Each
 * move animates whichever stickers a real cube turn would visibly affect on
 * the front face:
 *   - U / D : top / bottom row spins around its horizontal-row vertical axis
 *             (rotateY) so the affected stickers flip edge-on and reappear
 *             with the content that just rotated in from the adjacent face.
 *   - L / R : left / right column spins around its vertical-column horizontal
 *             axis (rotateX). Same idea, perpendicular axis.
 *   - F     : the whole 3x3 grid rotates in-plane (rotateZ), then snaps back
 *             with new content matching the permuted positions.
 *   - B     : doesn't touch the front face, so we apply it to state but skip
 *             the animation (it would look like nothing happened).
 *
 * With backface-visibility hidden, stickers vanish at the rotation midpoint;
 * that's when JS swaps each sticker's background-position to its new content.
 */

const FACES = ['F', 'B', 'U', 'D', 'L', 'R'];
const GRID = 3;
const NUM_MOVES = 5;
const MOVE_POOL = ['U', 'D', 'L', 'R'];

const NORMAL_TIMING = { moveMs: 720, pauseMs: 80, preludeMs: 220 };
const FAST_TIMING = { moveMs: 200, pauseMs: 30, preludeMs: 0 };

const ADJACENT = {
  U: [
    {
      face: 'F',
      cells: [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
    },
    {
      face: 'L',
      cells: [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
    },
    {
      face: 'B',
      cells: [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
    },
    {
      face: 'R',
      cells: [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
    },
  ],
  D: [
    {
      face: 'F',
      cells: [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
    },
    {
      face: 'R',
      cells: [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
    },
    {
      face: 'B',
      cells: [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
    },
    {
      face: 'L',
      cells: [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
    },
  ],
  L: [
    {
      face: 'F',
      cells: [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
    },
    {
      face: 'U',
      cells: [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
    },
    {
      face: 'B',
      cells: [
        [2, 2],
        [1, 2],
        [0, 2],
      ],
    },
    {
      face: 'D',
      cells: [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
    },
  ],
  R: [
    {
      face: 'F',
      cells: [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
    },
    {
      face: 'D',
      cells: [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
    },
    {
      face: 'B',
      cells: [
        [2, 0],
        [1, 0],
        [0, 0],
      ],
    },
    {
      face: 'U',
      cells: [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
    },
  ],
  F: [
    {
      face: 'U',
      cells: [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
    },
    {
      face: 'R',
      cells: [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
    },
    {
      face: 'D',
      cells: [
        [0, 2],
        [0, 1],
        [0, 0],
      ],
    },
    {
      face: 'L',
      cells: [
        [2, 2],
        [1, 2],
        [0, 2],
      ],
    },
  ],
  B: [
    {
      face: 'U',
      cells: [
        [0, 2],
        [0, 1],
        [0, 0],
      ],
    },
    {
      face: 'L',
      cells: [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
    },
    {
      face: 'D',
      cells: [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
    },
    {
      face: 'R',
      cells: [
        [2, 2],
        [1, 2],
        [0, 2],
      ],
    },
  ],
};

const PAINT_ROTATIONS = { F: 0, B: 2, U: 1, D: 3, L: 3, R: 1 };

export function initHeroMosaic(selector = '.hero-portrait') {
  const portrait = document.querySelector(selector);
  if (!portrait) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const img = portrait.querySelector('img');
  if (!img) return;

  let isSolving = false;
  let hasPlayedInitial = false;
  const trigger = () => {
    if (isSolving) return;
    isSolving = true;
    const sequence = hasPlayedInitial ? scrambleThenSolve : run;
    hasPlayedInitial = true;
    sequence(portrait, img).finally(() => {
      isSolving = false;
    });
  };

  whenImageReady(img, () => {
    trigger();
    portrait.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse') trigger();
    });
    portrait.addEventListener('click', trigger);
  });
}

function whenImageReady(img, callback) {
  if (img.complete && img.naturalWidth > 0) {
    callback();
    return;
  }
  img.addEventListener('load', callback, { once: true });
  img.addEventListener('error', callback, { once: true });
}

function run(portrait, img) {
  return playCubeAnimation(portrait, img, { scrambleVisible: false });
}

function scrambleThenSolve(portrait, img) {
  return playCubeAnimation(portrait, img, { scrambleVisible: true });
}

async function playCubeAnimation(portrait, img, { scrambleVisible }) {
  const src = img.currentSrc || img.src;
  if (!src) return;

  const scramble = generateMoves(NUM_MOVES);
  const state = createInitialState(scramble, scrambleVisible);
  const overlay = buildOverlay(src, state);
  portrait.appendChild(overlay);
  portrait.classList.add('hero-portrait--assembling');

  await playPhases(overlay, state, scramble, scrambleVisible);
  portrait.classList.remove('hero-portrait--assembling');
  overlay.remove();
}

function createInitialState(scramble, scrambleVisible) {
  const state = createSolvedState();
  if (scrambleVisible) return state;
  for (const move of scramble) applyTurn(state, move);
  return state;
}

async function playPhases(overlay, state, scramble, scrambleVisible) {
  const solve = scramble.slice().reverse().map(invertMove);
  if (scrambleVisible) {
    await playMoveSequence(overlay, state, scramble, FAST_TIMING);
  }
  await playMoveSequence(overlay, state, solve, NORMAL_TIMING);
}

function createSolvedState() {
  const stickers = [];
  for (const face of FACES) {
    for (let r = 0; r < GRID; r++) {
      for (let c = 0; c < GRID; c++) {
        stickers.push({
          face,
          row: r,
          col: c,
          contentFace: face,
          contentRow: r,
          contentCol: c,
        });
      }
    }
  }
  return stickers;
}

function generateMoves(count) {
  const moves = [];
  let prev = null;
  for (let i = 0; i < count; i++) {
    moves.push(randomMoveDifferentFrom(prev));
    prev = moves[i];
  }
  return moves;
}

function randomMoveDifferentFrom(prev) {
  let move = randomMove();
  while (prev && move.face === prev.face) {
    move = randomMove();
  }
  return move;
}

function randomMove() {
  const face = MOVE_POOL[Math.floor(Math.random() * MOVE_POOL.length)];
  const direction = Math.random() < 0.5 ? 1 : -1;
  return { face, direction };
}

function invertMove({ face, direction }) {
  return { face, direction: -direction };
}

function buildOverlay(src, state) {
  const overlay = document.createElement('div');
  overlay.className = 'hero-portrait__mosaic';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.setProperty('--cube-src', `url("${src}")`);
  for (const sticker of state) {
    if (sticker.face !== 'F') continue;
    overlay.appendChild(buildStickerEl(sticker));
  }
  return overlay;
}

function buildStickerEl(sticker) {
  const el = document.createElement('span');
  el.className = 'hero-portrait__sticker';
  el.dataset.row = String(sticker.row);
  el.dataset.col = String(sticker.col);
  el.style.gridColumn = String(sticker.col + 1);
  el.style.gridRow = String(sticker.row + 1);
  applyStickerContent(el, sticker);
  return el;
}

function applyStickerContent(el, sticker) {
  el.style.backgroundPosition = backgroundPositionFor(
    sticker.contentFace,
    sticker.contentRow,
    sticker.contentCol,
  );
}

function backgroundPositionFor(face, row, col) {
  const view = paintedView(face);
  const cell = view[row][col];
  const px = (cell.col / (GRID - 1)) * 100;
  const py = (cell.row / (GRID - 1)) * 100;
  return `${px}% ${py}%`;
}

function paintedView(face) {
  const turns = PAINT_ROTATIONS[face];
  let grid = identityGrid();
  for (let i = 0; i < turns; i++) {
    grid = rotateGridCW(grid);
  }
  return grid;
}

function identityGrid() {
  const grid = [];
  for (let r = 0; r < GRID; r++) {
    const row = [];
    for (let c = 0; c < GRID; c++) {
      row.push({ row: r, col: c });
    }
    grid.push(row);
  }
  return grid;
}

function rotateGridCW(grid) {
  const out = identityGrid();
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      out[r][c] = grid[GRID - 1 - c][r];
    }
  }
  return out;
}

function applyTurn(state, move) {
  rotateFaceStickers(state, move.face, move.direction);
  cycleAdjacentRows(state, move.face, move.direction);
}

function rotateFaceStickers(state, face, direction) {
  const onFace = state.filter((s) => s.face === face);
  const snapshot = onFace.map((s) => ({ row: s.row, col: s.col }));
  for (let i = 0; i < onFace.length; i++) {
    const s = onFace[i];
    const next = rotateOnFace(snapshot[i].row, snapshot[i].col, direction);
    s.row = next.row;
    s.col = next.col;
  }
}

function cycleAdjacentRows(state, face, direction) {
  const ring = ADJACENT[face];
  const stickers = ring.map((seg) =>
    seg.cells.map(([r, c]) => findStickerAt(state, seg.face, r, c)),
  );
  const shift = direction > 0 ? 1 : -1;
  for (let i = 0; i < ring.length; i++) {
    const sourceIdx = (((i - shift) % ring.length) + ring.length) % ring.length;
    moveStrip(stickers[sourceIdx], ring[i]);
  }
}

function moveStrip(movingStickers, dest) {
  for (let k = 0; k < GRID; k++) {
    const moving = movingStickers[k];
    moving.face = dest.face;
    moving.row = dest.cells[k][0];
    moving.col = dest.cells[k][1];
  }
}

function findStickerAt(state, face, row, col) {
  return state.find((s) => s.face === face && s.row === row && s.col === col);
}

function rotateOnFace(row, col, direction) {
  if (direction > 0) {
    return { row: col, col: GRID - 1 - row };
  }
  return { row: GRID - 1 - col, col: row };
}

async function playMoveSequence(overlay, state, moves, timing) {
  overlay.style.setProperty('--cube-turn-duration', `${timing.moveMs}ms`);
  await wait(timing.preludeMs);
  for (const move of moves) {
    await animateMove(overlay, state, move, timing);
    await wait(timing.pauseMs);
  }
}

function animateMove(overlay, state, move, timing) {
  const handlers = {
    U: () => animateRowOrColumn(overlay, state, move, frontRowCells(0), 'is-turning-y', timing),
    D: () => animateRowOrColumn(overlay, state, move, frontRowCells(2), 'is-turning-y', timing),
    L: () => animateRowOrColumn(overlay, state, move, frontColumnCells(0), 'is-turning-x', timing),
    R: () => animateRowOrColumn(overlay, state, move, frontColumnCells(2), 'is-turning-x', timing),
    F: () => animateFaceTurn(overlay, state, move, timing),
    B: () => animateNoop(state, move),
  };
  return (handlers[move.face] || handlers.B)();
}

function frontRowCells(row) {
  return [
    [row, 0],
    [row, 1],
    [row, 2],
  ];
}

function frontColumnCells(col) {
  return [
    [0, col],
    [1, col],
    [2, col],
  ];
}

function animateRowOrColumn(overlay, state, move, cells, animClass, timing) {
  return new Promise((resolve) => {
    const rawElements = cells.map(([r, c]) =>
      overlay.querySelector(`[data-row="${r}"][data-col="${c}"]`),
    );
    const elements = rawElements.filter(Boolean);

    for (const el of elements) {
      el.style.transformOrigin = sharedPivotOrigin(move.face, el);
      el.classList.add(animClass);
    }

    setTimeout(() => {
      applyTurn(state, move);
      for (let i = 0; i < cells.length; i++) {
        const [r, c] = cells[i];
        const sticker = findStickerAt(state, 'F', r, c);
        const el = rawElements[i];
        if (sticker && el) applyStickerContent(el, sticker);
      }
    }, timing.moveMs / 2);

    setTimeout(() => {
      for (const el of elements) {
        el.classList.remove(animClass);
        el.style.transformOrigin = '';
      }
      resolve();
    }, timing.moveMs + 30);
  });
}

// For U/D row turns, the three tiles share a vertical pivot at the row's
// horizontal midpoint; for L/R column turns, a horizontal pivot at the
// column's vertical midpoint. Pivot is expressed in each tile's own % box.
const PIVOT_AXIS = { U: 'x', D: 'x', L: 'y', R: 'y' };

function sharedPivotOrigin(face, el) {
  const axis = PIVOT_AXIS[face];
  if (!axis) return '50% 50%';
  const index = Number(el.dataset[axis === 'x' ? 'col' : 'row']);
  const offset = (1.5 - index) * 100;
  return axis === 'x' ? `${offset}% 50%` : `50% ${offset}%`;
}

function animateFaceTurn(overlay, state, move, timing) {
  return new Promise((resolve) => {
    overlay.classList.add('is-turning-z');
    setTimeout(() => {
      applyTurn(state, move);
      const front = state.filter((s) => s.face === 'F');
      for (const sticker of front) {
        const el = overlay.querySelector(`[data-row="${sticker.row}"][data-col="${sticker.col}"]`);
        if (el) applyStickerContent(el, sticker);
      }
      overlay.classList.remove('is-turning-z');
      resolve();
    }, timing.moveMs);
  });
}

function animateNoop(state, move) {
  applyTurn(state, move);
  return Promise.resolve();
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
