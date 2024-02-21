export async function onRequest(context) {
  const obj = await context.env.filterjson.get('430.json');
pAnnts = obj;
  var offers = [];
Object.keys(pAnnts).forEach(function(key,elem) {
  var tRgn = 0;
  var value = pAnnts[key];
  var str = elem.toString();
$('#'+str+'').name = key.substring(0,2)+str;
var tRgn = 0;
var value = pAnnts[key];
var str = elem.toString();
$('#'+str+'').name = key.substring(0,2)+str;
$('#'+str+'').show();

tValue = ' ';
tpics = []; 
pname = '';
var cRegion = key;
var aRegion = key.substring(0,3);
//+elem;

rDetail = key.substring(0,2)+str+',';
  console.warn('current', key,value[0].Province,value[0].Pitch);
var mLabel = value[0].Province;
var rVideo = value[0].Pitch; 
if (rVideo.includes("src=")) { 
  //use it   
 }else{
   var rVideo = ` <div style="position: relative; padding-top: 56.25%;"><iframe src="`+rVideo+ `" style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>`;  
 };
for (var h = 1; h <value.length; h++ ) {
    var rDetail = rDetail+value[h].IATA+',';

var tValue = tValue + value[h].City + ' * ' ;

   // if ($('#tournet-nearby').attr('options') == 0){
//document.getElementById(''+str+'').src = tImg; 
//document.getElementById('xy'+str+'').innerHTML = mLabel;
   //  };
//var pcountry = $('#myItin').attr('data-country')+ '/';       
var pcountry = "US_";  
var tImg = "https://mmedia.tournet.com/Tournet/Destinations/Presentation/"+ pcountry +cRegion+'/'+ value[h].City+'.jpg';
var Tpics = {"img": tImg , "name" : value[h].City, "description" : value[h].Pitch, "iata" : value[h].IATA};
//var Tpics = {Tpics};
tpics.push(Tpics);
    

    
var thisoffer = {
  Ofr_OfferId: 555,
 Ofr_Name:  tValue,
 Ofr_Location: cRegion,
 Cmp_CompanyId: "431", 
Ofr_Pictures: JSON.stringify(tpics),
 Ofr_Type: "C",
 Ofr_Instructions: rDetail,
 Ofr_AutoResponse: 'NY',
 Pds_ProdServiceId: "272744",
 Ofr_WgtLanguages: "en" ,
   Ofr_Published: "204",
 Pdt_Type: "P",
   Ofr_EmVideo: rVideo
 };
//   document.getElementById(''+elem+'').src = tImg; 
};
    rDtl =  rDetail.slice(0, -1);
//rDtl = rDetail.split(',');
console.warn('current',rDtl);     
 if ($('#tournet-nearby').attr('options') == 0){
// document.getElementById(''+str+'').name = rDtl.substring(4);
  //rDtl;
 };

//    document.getElementById(''+elem+'').src = tImg; 
offers.push(thisoffer);

});

  if (obj === null) {
    return new Response('Not found', { status: 404 });
  }
  //return new Response(obj.body);
  return new Response(offers);
}