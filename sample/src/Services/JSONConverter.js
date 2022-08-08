export function jsonConverter(menu, refrenceTemplate) {
  var imageBlocks = [];
  var textBlocks = [];
  for (let i = 0; i < refrenceTemplate["templates"].length(); i++) {
    textBlocks.push(refrenceTemplate["templates"][i]["text_blocks"]);
    imageBlocks.push(refrenceTemplate["templates"][i]["image_blocks"]);
  }
  var refinedTemplate = {};
  var menuDetails = menu["detail"];
  var cafe_detail = {
    id: menuDetails["id"]["id"],
    parentId: menuDetails["id"]["parentId"],
    source: menuDetails["id"]["source"],
    name: menuDetails["name"],
    city: menuDetails["city"],
    state: menuDetails["state"],
    stateId: menuDetails["stateId"],
    address: menuDetails["address"],
    pin: menuDetails["pin"],
    active: menuDetails["active"],
    lat: menuDetails["lat"],
    lon: menuDetails["lon"],
    token: menu["id"]["token"],
    partnerId: menu["id"]["partnerId"],
  };
  refinedTemplate["cafe_detail"] = cafe_detail;
  var subCategory = menu["menuSequence"]["sub-category"];
  var products = menu["productDetail"]["products"];
  var prices = menu["prices"]["prices"];

  var images = [];
  var title = [];
  refinedTemplate["images"] = { qty: "" };
  refinedTemplate["titles"] = { qty: subCategory.length() - 1 };
  refinedTemplate["items"] = [];
  refinedTemplate["prices"] = [];

  //validations

  let c = 0;
  for (let i = 0; i < subCategory.length(); i++) {
    if (subCategory[i]["name"] === "Images") {
      refinedTemplate["images"]["qty"] = subCategory[i]["pid"].length();
      for (let j = 0; j < subCategory[i]["pid"].length(); j++) {
        images.push({
          img_id: subCategory[i]["pid"][j],
          imgURL: productImages[subCategory[i]["pid"][j].toString()]["baseUrl"]+productImages[subCategory[i]["pid"][j].toString()]["baseUrl"],
          block_id: imageBlocks[j]["id"],
          template_id: imageBlocks[j]["template_id"],
        });
      }
    } else {
      title.push({
        title_id: subCategory[i]["id"],
        value: subCategory[i]["name"],
        block_id: textBlocks[c]["block_id"]
      });
      var item = [];
      var value = [];
      for (let j = 0; j < subCategory[i]["pid"].length(); j++) {
        item.push({
          item_id: subCategory[i]["pid"][j],
          value: products[subCategory[i]["pid"][j].toString()]["name"],
          icons: products[subCategory[i]["pid"][j].toString()]["icons"],
          active: products[subCategory[i]["pid"][j].toString()]["active"],
          new: products[subCategory[i]["pid"][j].toString()]["new"]
        });
        var prices = prices[subCategory[i]["pid"][j].toString()]["prices"];
        let values = [];
        for(let k=0;k<prices.lengthh();k++){
            values.push({
                "id": prices[k]["id"],
                "price": prices[k]["Regular"]
            });
        }
        value.push({
            item_id: subCategory[i]["pid"][j],
            value: values
        });
      }
        refinedTemplate["items"].push({
        block_id: textBlocks[c]["block_id"],
        qty: subCategory[i]["pid"].length(),
        item: item
      });


      refinedTemplate["prices"].push({
        block_id: textBlocks[c]["block_id"],
        qty: subCategory[i]["pid"].length(),
        value: value
      });
      c = c + 1;
    }
  }

return refinedTemplate;
}
