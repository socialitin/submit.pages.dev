export async function onRequest(context) {
  const obj = await context.env.filterjson.get('430.json');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  }

  var offers = [];
Object.keys(obj).forEach(function(key,elem) {
  var tRgn = 0;
  var value = obj[key];
  var str = elem.toString();
$('#'+str+'').name = key.substring(0,2)+str;
var tRgn = 0;
//var value = pAnnts[key];
//var str = elem.toString();
  //$('#'+str+'').name = key.substring(0,2)+str;
//$('#'+str+'').show();

tValue = ' ';
tpics = []; 
pname = '';
var cRegion = key;
var aRegion = key.substring(0,3);
//+elem;

rDetail = key.substring(0,2)+str+',';
 // console.warn('current', key,value[0].Province,value[0].Pitch);
var mLabel = value[0].Province;
var rVideo = value[0].Pitch; 

 var tpics = [];
for (var h = 1; h <value.length; h++ ) {
    var rDetail = rDetail+value[h].IATA+',';

var tValue = tValue + value[h].City + ' * ' ;

   // if ($('#tournet-nearby').attr('options') == 0){
//document.getElementById(''+str+'').src = tImg; 
//document.getElementById('xy'+str+'').innerHTML = mLabel;
   //  };
//var pcountry = $('#myItin').attr('data-country')+ '/';       
var pcountry = "US_";  
//var tImg = "https://mmedia.tournet.com/Tournet/Destinations/Presentation/"+ pcountry +cRegion+'/'+ value[h].City+'.jpg';
var tImg ='blank.jpg';
//var Tpics = {"img": tImg , "name" : value[h].City, "description" : value[h].Pitch, "iata" : value[h].IATA};
var Tpics = {};
//tpics.push(Tpics);
      


};
//if ($('#tournet-nearby').attr('options') == 0){
  //document.getElementById(''+str+'').name = rDtl.substring(4);
// };
//offers.push(thisoffer);
});
  return new Response(obj.body);
 // return new Response(offers);
}
