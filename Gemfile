source "https://rubygems.org"

# Specify compatible Ruby version
ruby ">= 3.3.0", :optional => true

gem "jekyll", "~> 4.4.1"

# Add explicit dependencies for Ruby 3.4.0+ compatibility
gem "logger"
gem "csv"
gem "bigdecimal"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.6"
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]