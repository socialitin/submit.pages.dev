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
//$('#'+str+'').name = key.substring(0,2)+str;
var tRgn = 0;
//var value = pAnnts[key];
//var str = elem.toString();
  //$('#'+str+'').name = key.substring(0,2)+str;
//$('#'+str+'').show();

tValue = ' ';
//tpics = []; 
//pname = '';
var cRegion = key;
var aRegion = key.substring(0,3);

});
  return new Response(obj.body);
 // return new Response(offers);
}
