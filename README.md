# ChatServer


Gera allt tilbúið fyrir ChatApp


First þarftu að hafa NodeJS installað í tölvunni 
getur fengið hjálp með það inn á
http://nodejs.org

-------------------------

Næst þarftu að vera með grunt installað í tölvunni
http://gruntjs.com/getting-started

-------------------------


Þegar NodeJS og Grunt er komið þá áttu að opna terminal
og fara inn í Client möppuna sem fylgir með verkefninu.

Inn í client möppunni keyriru eftirfarandi skipanir

npm install,
bower install,
grunt


-------------------------

Keyrsla Á ChatApp

Þú opnar Terminal og ferð inn í verkefnið ferð inn í möppu sem heitir chatserver
þar inni keyriru skipunina

node chatserver.js


Næst opnaru aðra Terminal ferð inn í verkefnið og inn í möppu sem heitir 
Client
Þar keyriru aðra skipun

python -m SimpleHTTPServer 8888


Þá ættirðu að geta opnað GoogleChrome og keyra

http://localhost:8888/ 

Núna ætti að birtast log inn gluggi á síðunni og þú getur byrjað að leika þér.