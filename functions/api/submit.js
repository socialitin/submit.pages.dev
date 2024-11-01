/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
    try {
      //  const db = context.env.DB;

        // Parse form data from the request
        let formData = await context.request.formData();

        // Convert form data to JSON object
        let formDataObject = {};
        for (const [name, value] of formData.entries()) {
            formDataObject[name] = value;
        }
        // Convert the JSON object to a string
        let jsonData1 = JSON.stringify(formDataObject,null,2);
       // let pretty = JSON.stringify(output, null, 2);
console.log(jsonData1);
//console.log('jdata is', jsonData);
//let pWrapb = {};
///let jsonData = {"3-5":{"IATA":"US1","Province":"Easten","City":"US2-Eastern","embVideo":"<div width=\"20%\" \"><div style=\"position: relative; padding-top: 100%;\"><iframe src=\"https://iframe.videodelivery.net/c572438216d9778a180b4df0784ffb4d?poster=https%3A%2F%2Fvideodelivery.net%2Fc572438216d9778a180b4df0784ffb4d%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600\" style=\"border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;\" allow=\"accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;\" allowfullscreen=\"true\"></iframe></div>MASOMO 3-5 Unique and captivating, with channels that continually change a scenario unlike any other in the world.</div>","Pictures":"[{\"img\":\"https://mmedia.tournet.com/Tournet/www.travelknowhow.com/New York/ChicagoMusical/Orquesta center.png\",\"description\":\"tickets from $ 150 to $420\",\"name\":\"Orquesta Center \"},{\"img\":\"https://mmedia.tournet.com/Tournet/www.travelknowhow.com/New York/ChicagoMusical/Orquesta sides.png\",\"description\":\"tickets from $ 120 \",\"name\":\"Orquesta left and right\"},{\"img\":\"https://mmedia.tournet.com/Tournet/www.travelknowhow.com/New York/ChicagoMusical/Mezzanine.png\",\"description\":\"tickets from $ 120 \",\"name\":\"Mezzanine \"},{\"img\":\"https://mmedia.tournet.com/Tournet/www.travelknowhow.com/New York/ChicagoMusical/Rear Mezzanine.png\",\"description\":\"tickets from $ 120\",\"name\":\"Mezzanine Rear \"}]","typeKind":"Sightseeing","venue":"Attraction","pitch":"MASOMO ...Unique and captivating, with channels that continually change a scenario unlike any other in the world."}};
//JSON.stringify(formDataObject);
//
//jsonData = {"'+pWrapa+'":'+pWrap+'};
////
const thiscmpj = "3-5";
//document.getElementById('jdata').dataset.cpit;
console.log(thiscmpj);
            //const pWrap = new FormData(event.target);
            const jsonData = {[thiscmpj]: JSON.stringify(formDataObject,null,2)};
              console.log(JSON.stringify(jsonData));
/////
console.log('jdata is', jsonData);
        // Insert the JSON data into the SQLite database
       // await db.run("INSERT INTO hosts (pitching) VALUES (?)", [jsonData]);
       //const stmt = context.env.DB.prepare("INSERT INTO hosts (pitching) VALUES (?),[jsonDate]");

       const stmt = context.env.DB.prepare("UPDATE hosts SET pitching = ? WHERE CompanyName LIKE '%Pereirawas%' ");
const response = await stmt.bind(jsonData).run(); 

       //Update corresponding published json

       
        return new Response(jsonData, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    } catch (err) {
        return new Response('Error inserting data into SQLite database', { status: 500 });
    }
}
  