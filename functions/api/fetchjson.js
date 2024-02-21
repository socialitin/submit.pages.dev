export async function onRequest(context) {
  const obj = await context.env.filterjson.get('430.json');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  }

  let offers = [];
Object.keys(obj).forEach(function(key,elem) {
   const value = obj[key];
  
  /// const str = elem.toString();
//$('#'+str+'').name = key.substring(0,2)+str;

  //$('#'+str+'').name = key.substring(0,2)+str;
//$('#'+str+'').show();
/// const tValue = '';
//// const tpics = []; 
/// const cRegion = key;
//var aRegion = key.substring(0,3);


/// var rDetail = key.substring(0,2)+str+',';

 // console.warn('current', key,value[0].Province,value[0].Pitch);
//const rVideo = value[0].Pitch; 

let rDetail = '';
for (var h = 1; h <value.length; h++ ) {
   /// var rDetail = rDetail+value[h].IATA+',';
   rDetail += value[h].IATA+',';
/// var tValue = tValue + value[h].City + ' * ' ;

   // if ($('#tournet-nearby').attr('options') == 0){
//document.getElementById(''+str+'').src = tImg; 
//document.getElementById('xy'+str+'').innerHTML = mLabel;
   //  };
//var pcountry = $('#myItin').attr('data-country')+ '/';       
//var pcountry = "US_";  
//var tImg = "https://mmedia.tournet.com/Tournet/Destinations/Presentation/"+ pcountry +cRegion+'/'+ value[h].City+'.jpg';
//var Tpics = {"img": tImg , "name" : value[h].City, "description" : value[h].Pitch, "iata" : value[h].IATA};
//tpics.push(Tpics);
      
var thisoffer = {
  Ofr_OfferId: 555,
 Ofr_Name:  {},
 Ofr_Location: 'NYC',
 Cmp_CompanyId: "431", 
Ofr_Pictures: [],
 Ofr_Type: "C",
 Ofr_Instructions: rDetail,
 Ofr_AutoResponse: 'NY',
 Pds_ProdServiceId: "272744",
 Ofr_WgtLanguages: "en" ,
   Ofr_Published: "204",
 Pdt_Type: "P",
   Ofr_EmVideo: ''
 };

};
//if ($('#tournet-nearby').attr('options') == 0){
  //document.getElementById(''+str+'').name = rDtl.substring(4);
// };
offers.push(thisoffer);
});
  return new Response(obj.body);
 // return new Response(offers);
}
