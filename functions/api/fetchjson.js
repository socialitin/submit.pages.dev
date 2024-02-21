export async function onRequest(context) {
  const obj = await context.env.filterjson.get('430.json');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  }

  var offers = '';
Object.keys(obj).forEach(function(key,elem) {
  //const tRgn = 0;
  const value = obj[key];
  const str = elem.toString();
//$('#'+str+'').name = key.substring(0,2)+str;
const tRgn = 0;
//const value = pAnnts[key];
//const str = elem.toString();
  //$('#'+str+'').name = key.substring(0,2)+str;
//$('#'+str+'').show();

//tValue = ' ';
//tpics = []; 
//pname = '';
const cRegion = key;
const aRegion = key.substring(0,3);
var offers = offers+ value;
});
  //return new Response(obj.body);
  return new Response(offers);
}
