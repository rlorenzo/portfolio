#!/usr/bin/env ruby
# scripts/ruby_version_check.rb
# A helper script to check Ruby version and provide guidance on Jekyll compatibility issues

require 'rubygems'

# Print header
puts "\n#{'-' * 80}"
puts "Jekyll Compatibility Helper".center(80)
puts "#{'-' * 80}"

# Check Ruby version
ruby_version = RUBY_VERSION
ruby_major = RUBY_VERSION.split('.')[0].to_i
ruby_minor = RUBY_VERSION.split('.')[1].to_i
ruby_patch = RUBY_VERSION.split('.')[2].to_i

puts "Your Ruby version: #{ruby_version}"

# Determine compatibility status
if (ruby_major == 3 && ruby_minor >= 4) || ruby_major > 3
  compatibility = "WARNING: Potential compatibility issues"
  puts "\n❗ #{compatibility} ❗"
  puts "\nRuby 3.4.0+ no longer includes certain standard libraries as default gems,"
  puts "which may cause Jekyll to fail with errors about missing 'logger', 'csv', or 'bigdecimal' gems."
  puts "However, our Gemfile is configured to support your Ruby version #{ruby_version}."
  
  # Check if necessary gems are installed
  missing_gems = []
  %w[logger csv bigdecimal].each do |gem_name|
    begin
      require gem_name
    rescue LoadError
      missing_gems << gem_name
    end
  end

  if missing_gems.any?
    puts "\n⚠️  Missing required gems: #{missing_gems.join(', ')}"
    
    puts "\nRecommended solutions:"
    puts "\n1️⃣  Add missing gems to your Gemfile:"
    puts "    ```"
    puts "    # Add explicit dependencies for Ruby 3.4.0+ compatibility"
    missing_gems.each do |gem_name|
      puts "    gem \"#{gem_name}\""
    end
    puts "    ```"
    puts "\n2️⃣  Then run:"
    puts "    bundle install"
    puts "    bundle update"
  else
    puts "\n✅ Required gems (logger, csv, bigdecimal) are installed."
  end
  
  puts "\nAdditional recommendations:"
  puts "\n3️⃣  Ensure your Gemfile has the correct Ruby version specification:"
  puts "    ```"
  puts "    ruby \">= 3.3.0\", :optional => true"
  puts "    ```"
  
  puts "\n4️⃣  Or use Ruby Version Manager to install a more compatible version:"
  puts "    ```"
  puts "    # Using rbenv"
  puts "    rbenv install 3.3.0"
  puts "    rbenv local 3.3.0"
  puts ""
  puts "    # Using rvm"
  puts "    rvm install 3.3.0"
  puts "    rvm use 3.3.0"
  puts "    ```"
  
elsif ruby_major == 3 && ruby_minor == 3
  puts "\n✅ Your Ruby version is fully compatible with Jekyll 4.4.x"
  puts "No additional configuration needed."
  
elsif ruby_major == 3 && ruby_minor == 2
  puts "\n✅ Your Ruby version is fully compatible with Jekyll 4.4.x"
  puts "No additional configuration needed."
  
elsif ruby_major == 3 && ruby_minor <= 1
  puts "\n⚠️  Your Ruby version is compatible but outdated."
  puts "Consider upgrading to Ruby 3.2.x or 3.3.x for better security and performance."
  
elsif ruby_major == 2 && ruby_minor >= 7
  puts "\n⚠️  Your Ruby version is compatible but outdated."
  puts "Ruby 2.7.x is no longer maintained. Consider upgrading to Ruby 3.2.x or 3.3.x."
  
else
  puts "\n❌ Your Ruby version is too old and may not work with Jekyll 4.4.x."
  puts "Jekyll 4.4.x requires Ruby 2.5.0 or newer."
  puts "Please upgrade your Ruby installation."
end

puts "\n#{'-' * 80}"
puts "Gem Environment Information".center(80)
puts "#{'-' * 80}"
puts "RubyGems version: #{Gem::VERSION}"
puts "Gem paths:"
Gem.path.each do |path|
  puts "  - #{path}"
end

puts "\n#{'-' * 80}"
puts "For more help, visit: https://jekyllrb.com/docs/installation/"
puts "#{'-' * 80}\n"

# Check for Jekyll installation
begin
  require 'jekyll'
  puts "Jekyll version: #{Jekyll::VERSION}"
  puts "✅ Jekyll is properly installed."
rescue LoadError
  puts "❌ Jekyll is not installed or not in the load path."
  puts "Run 'gem install jekyll bundler' to install Jekyll."
end