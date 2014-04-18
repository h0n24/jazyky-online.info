# struktura předělána, již není nutno ručně měnit umístění souboru :)

def render(partial,locals = {})
  file = File.dirname(__FILE__) + "/layout/_#{partial}.haml"
  contents = File.read(file)
  Haml::Engine.new(contents).render(Object.new, locals)
end

def reklama(size)
  return '<div class="adsense hidden-print"><script async src="http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-7058441231119392" data-ad-slot="9111432696"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>'
end