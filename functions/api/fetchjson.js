export async function onRequest(context) {
  const obj = await context.env.filterjson.get('NYC-NIA.json');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  }

    //var rDetail = obj[0].IATA;
    //var tValue = obj[0].City;
    //var cRegion = obj[0].Province;
  //var tpics = [];
  //var rVideo = obj[0].Pitch;
  
    const thisoffer = {
      Ofr_OfferId: 555,
     Ofr_Name:  obj[0].City,
     Ofr_Location: obj[0].Province,
     Cmp_CompanyId: "431", 
  Ofr_Pictures: [],
     Ofr_Type: "C",
     Ofr_Instructions: obj[0].IATA,
     Ofr_AutoResponse: 'NY',
     Pds_ProdServiceId: "272744",
     Ofr_WgtLanguages: "en" ,
       Ofr_Published: "204",
     Pdt_Type: "P",
       Ofr_EmVideo: obj[0].Pitch
     };
    
    return new Response(obj.body);
   // return new Response(offers);

};
