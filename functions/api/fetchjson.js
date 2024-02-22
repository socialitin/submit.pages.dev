export async function onRequest(context) {
  const obj = await context.env.filterjson.get('NYC-NIA.json');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  }

    var rDetail = value[0].IATA;
    var tValue = value[0].City;
    var cRegion = value[0].Province;
  var tpcis = [];
  rVideo = '';
  
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
    
    return new Response(obj.body);
   // return new Response(offers);

};
