const { product } = require('../models/users');
const { catagory } = require('../models/users');

function getChild(x, serachField) {
    let result = serachField.filter((ele) => {
        return ele.parentId == x;
    });
    if (result.length == 0) {
        return [];
    }
    let t = [];
    let f = [];
    result.forEach(element => {
        t.push(element.id);
        f.push(element.id);
    });
    t.forEach(el => {
        f = f.concat(getChild(el, serachField));
    })

    return f;
}
exports.getProductList = async (req, res) => {
    let count  = 2;
    let pageNo = req.body.pageNo;
    let catResult = new Set();
    let catList = req.body.catList;
    let serachField = await catagory.find().exec();
    for (let x of catList) {

        // getChild(x, serachField).forEach(el => {
        //     catResult.add(el);
        // })
        let cur = [];
        cur.push(x);
        while (cur.length > 0) {
            let result = serachField.filter( (ele) => {
                return ele.parentId == cur[0];    
             });
             result.forEach( el => {
                cur.push(el.id);
             })
             catResult.add(cur[0]);
             cur.shift();
        }
    }
    let query = Array.from(catResult);
    const pipeline = [
        { $match: { catagoryId : { $in : query} } },
        { $skip: count*pageNo},
        { $limit : count }
    ];
    const aggCursor =  await product.aggregate(pipeline);
    let result = {
        data : aggCursor,
        count  : aggCursor.length
    }
    res.send(result);
}
