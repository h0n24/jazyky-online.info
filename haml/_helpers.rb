$base_dir = "C:\\Users\\Jan\\Dropbox\\Github\\jazyky-online.info\\haml\\"

def render_file(filename)
  file = $base_dir + filename
  contents = File.read(file)
  Haml::Engine.new(contents).render
end