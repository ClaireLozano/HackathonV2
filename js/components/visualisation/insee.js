var url_string = window.location.href;
	var url = new URL(url_string);
	var d = url.searchParams.get("data");
    if(d == 'population_2008')
    {
      

      endUrl ="&db=ecnaissance&table=acte_naissance_02&filter=an_evenement_annee%2520equalto%25202017&format=json";
      $body = $("body");
      $body.addClass("loading");
  
          jQuery.ajax({
              type: "POST",
              url: '../rest.php',
              data: {functionname: 'getOpenData', arguments: endUrl},
              success:function(data) {
              var obj = JSON.parse(data);
             // console.log(obj.opendata.answer.data);
             var ch = "";
             obj.opendata.answer.data.forEach(function(d, i) {
                for (var i = 0; i<parseInt(d.an_nombre); i++) {
                  ch = ch+d.an_enfant_premier_prenom+',';
                }
                
            });
            $("#box6").html("");
            drawWordCloud(ch);
            
        
                }
      });

		}else
		{
			$('#tab-nav-6').hide();
    }
    

      function drawWordCloud(text_string){
        
        var word_count = {};

        var words = text_string.split(',');
          if (words.length == 1){
            word_count[words[0]] = 1;
          } else {
            words.forEach(function(word){
              var word = word.toLowerCase();
              if (word != "" && word.length>1){
                if (word_count[word]){
                  word_count[word]++;
                } else {
                  word_count[word] = 1;
                }
              }
            })
          }

        var svg_location = "#box6";
        var width = document.getElementById('nav').clientWidth;
        var height = $(document).height();

        var fill = d3.scale.category20();

        var word_entries = d3.entries(word_count);

        var xScale = d3.scale.linear()
           .domain([0, d3.max(word_entries, function(d) {
              return d.value;
            })
           ])
           .range([10,100]);

        d3.layout.cloud().size([width, height])
          .timeInterval(20)
          .words(word_entries)
          .fontSize(function(d) { return xScale(+d.value); })
          .text(function(d) { return d.key; })
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          .font("Impact")
          .on("end", draw)
          .start();

        function draw(words) {
          d3.select(svg_location).append("svg")
              .attr("width", width)
              .attr("height", height)
            .append("g")
              .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
            .selectAll("text")
              .data(words)
            .enter().append("text")
              .style("font-size", function(d) { return xScale(d.value) + "px"; })
              .style("font-family", "Impact")
              .style("fill", function(d, i) { return fill(i); })
              .attr("text-anchor", "middle")
              .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
			  .text(function(d) { $body = $("body"); $body.removeClass("loading"); return d.key; });
        }

        d3.layout.cloud().stop();
      }