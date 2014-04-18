# struktura předělána, již není nutno ručně měnit umístění souboru :)

def render(partial,locals = {})
  file = File.dirname(__FILE__) + "/layout/_#{partial}.haml"
  contents = File.read(file)
  Haml::Engine.new(contents).render(Object.new, locals)
end