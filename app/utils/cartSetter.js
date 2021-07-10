export  function cartSetter({cart,value,data}) {
    let cardData=cart
    for (let val in cardData) {
        let i = cardData[val]
        if (i.data.id === data.id) {
            i.value = value
            i.data = data
            cardData.push(i)
        }
        else {
            cardData.push({ value, data })
        }
    }
    if (cardData.length < 1) {
        cardData.push({ value, data })
    }
    let uniqueAddresses = Array.from(new Set(cardData.map(a => a.data.id)))
        .map(id => {
            console.log("id--==>",id);
            return cardData.find(a => a.data.id == id)
        })
    uniqueAddresses = uniqueAddresses.filter(item => item.value > 0)
    // console.log("unniww",uniqueAddresses);
    return uniqueAddresses
}
export function valueFinder(value,array) {
    if(array.length<1) return 0
    let val=array.find(obj=>obj.data.id==value.id)
    if(val){
        return val.value
    }
    return 0
}