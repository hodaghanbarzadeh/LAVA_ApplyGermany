$(() => {
  new WOW().init();

  window.ids=location.search.split('ids=')[1].split('&')[0].split(',');
  window.selectedUni=uinpoint.filter(u=>ids.filter(id=>u.uni.UniId==id).length>0).sort((a,b)=>a.uni.Rank-b.uni.Rank);
  $table=$('#tbluni');
  
  window.selectedUni.map(u=>u.uni).forEach((u,i)=>{
    $('<tr><th scope="row">'+(i+1)+'</th></tr>')
      .appendTo($table.find('tbody'))
      .append($('<td>').text(u.UniName))
      .append($('<td>').text(u.City))
      .append($('<td>').text(u.UniId))
      .append($('<td>').text(u.Rank))
    $table.find('tbody')
  });
  let i=0;
  let uninames=selectedUni.map(a=>a.uni.other[0].name);
  let radarData =selectedUni.map(a=>a.other)
  // .map(u=>({
  //   name:u.name,
  //   medicine_health_science: Number.parseFloat( u.medicine_health_science.replace('%',"")),
  //   natural_sciences_mathematics: Number.parseFloat( u.natural_sciences_mathematics.replace('%',"")),
  //   law_economic_and_social_sciences: Number.parseFloat( u.law_economic_and_social_sciences.replace('%',"")),
  //   humanities_languages: Number.parseFloat( u.humanities_languages.replace('%',"")),
  //   engineering_science_incl_computer_science: Number.parseFloat( u.engineering_science_incl_computer_science.replace('%',"")),
  //   other_studies:Number.parseFloat(  u.other_studies.replace('%',""))
  // }))
  .map(u=>({
    name:u.name,
    medicine_health_science: Number.parseFloat( u.medicine_health_science_per.replace('%',""))*100,
    natural_sciences_mathematics: Number.parseFloat( u.natural_sciences_mathematics_per.replace('%',""))*100,
    law_economic_and_social_sciences: Number.parseFloat( u.law_economic_and_social_sciences_per.replace('%',""))*100,
    engineering_science_incl_computer_science: Number.parseFloat( u.engineering_science_incl_computer_science_per.replace('%',""))*100,
    humanities_languages: Number.parseFloat( u.humanities_languages_per.replace('%',""))*100,
    other_studies:Number.parseFloat(  u.other_studies_per.replace('%',""))*100
  }))
  .map(u=>({
    className: "legen"+(++i),
    name: u.name,
    axes:[{axis: "Medicine Health", value: u.medicine_health_science},
    {axis: "Natural Sciences & Mathematics", value: u.natural_sciences_mathematics},
    {axis: "Law Economic & Social Sciences", value: u.law_economic_and_social_sciences},
    {axis: "Humanities Languages", value: u.humanities_languages},
    {axis: "Engineering Science & Computer Science", value: u.engineering_science_incl_computer_science},
    {axis: "Other Studies", value: 100-(u.medicine_health_science+ u.natural_sciences_mathematics+u.law_economic_and_social_sciences+u.humanities_languages+u.engineering_science_incl_computer_science)}]
  }));
  RadarChart.defaultConfig.radius = 3;
  var chart = RadarChart.chart();
  var cfg = chart.config(); // retrieve default config
  cfg.w=400;
  cfg.h=400;
  $('#radarchart1').width(cfg.w+300);
  RadarChart.draw("#radarchart1", radarData,{...cfg,maxValue:100,levels: 5,factor:0.8,open:true});

  var chart = c3.generate({
    bindto: '#barchart1',
    data: {
        columns: [
            ['Bachelor'].concat(selectedUni.map(a=>a.other.total_number_of_students)),
            ['Master'].concat(selectedUni.map(a=>a.other.number_of_master_degree_students))
        ],
        type: 'bar',
        groups: [
            ['Bachelor', 'Master']
        ]
    },
    axis: {
      x: {
        type: 'category',
        categories: selectedUni.map(a=>a.uni.Acronym||a.uni.UniName )
      }
    }
});

});
