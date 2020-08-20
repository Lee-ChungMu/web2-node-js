var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    console.log(queryData.id);
    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    var template = `
    <!doctype html>
    <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-175329272-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-175329272-1');
    </script>

      </head>

      <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li><br>
        </ol>

        <h2>${title}</h2>
    <p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/7T7r_oSp0SE"
      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
      picture-in-picture" allowfullscreen></iframe>
    </p>
        <p>
        <a href="https://d2.naver.com/news/3435170" target="_blank" title="back-end tip">'백엔드 개발자'</a>가 담당하는 일은 범위가 넓습니다.
        사용자에게 보이는 웹 어플리케이션 개발뿐만 아니라 데이터 분석을 위한 엔지니어링,
        분산파일시스템이나 DBMS와 같은 제품을 만드는 개발자들도 백엔드 개발자라 불리기도 합니다.
        '웹 프런트엔드 개발자', '모바일앱(iOS/Android) 개발자' 에 비하면 그 대상이나 하는
        일이 상대적으로 모호합니다. 어플리케이션을 개발하는 백엔드 개발자는 프로젝트에 따라서는
        서버관리, DB관리, 프런트엔드 개발까지 모두 담당하기도 합니다. 현대 야구가 발전하면서
        선발/중간/마무리 투수가 구별된 것처럼 이전에는 백엔드 개발자가 다 하던 일이 분업화된
        영역도 있습니다.</p>
        <img src="coding.jpg" width="100%">
        <p style="margin-top:45px;">
        이렇듯 백엔드 개발자는 폭넓은 기술을 접할 수 있는 역할을 수행합니다.
        SE(System engineer), FE(Front End) 등 인접한 분야의 개발자와
        소통할 기회가 많습니다. 그리고 접한 분야 중 한 분야에 대한 전문성을
        키울 수 있는 기회를 만나기도 쉽습니다. 예를 들면 담당하는 서비스의
        통계 모듈 개발로 시작해서 대용량 데이터를 다루는 데이터 엔지니어로 성장하는 경우입니다.
        </p>

        <p>
        특화된 분야의 전문가로 성장하더라도 어플리케이션을 잘 개발하는 능력은 중요합니다.
         다른 개발자가 사용하는 플랫폼이나 라이브러리의 개발도 어플리케이션 개발의 특성을
         이해해야 적용하기가 편리한 인터페이스를 설계할 수 있습니다. 대용량 데이터 분석이나
         처리를 담당하는 개발자라도 업무 효율화를 위해 모니터링, 관리 도구를 만들어야
         할 때도 있습니다.그래서 깊이 있는 전문분야와 함께 어플리케이션 개발 능력을 갖춘다면
        더욱 유능한 개발자가 될 수 있습니다. 남은 질문에 대한 대답들은 백엔드 어플리케이션
         개발 분야에 초점을 맞춰서 드리고자 합니다.
         </p>
         <div id="disqus_thread"></div>
          <script>

          /**
          *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
          *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
          /*
          var disqus_config = function () {
          this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
          this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
          };
          */
          (function() { // DON'T EDIT BELOW THIS LINE
          var d = document, s = d.createElement('script');
          s.src = 'https://web1-tvl9v4v1p3.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
          })();
          </script>
          <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
          <!--Start of Tawk.to Script-->
          <script type="text/javascript">
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/5f34e86c4c7806354da603a5/default';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
          </script>
          <!--End of Tawk.to Script-->
      </body>
    </html>

    `;
    response.end(template);

});
app.listen(3000);
