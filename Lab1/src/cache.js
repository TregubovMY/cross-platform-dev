class Cache{
  constructor(data) {
    this.__data = this.normalizeData(data);
    this.__log = "";
  }

  normalizeData(data){
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = {
        value: data[key].value || null,
        quantity: data[key].value ? data[key].quantity || 1 : 0
      };
      
      return acc;
    }, {});
  }

  get log(){
    return this.__log.trim();
  }

  value(key){
    this.add2Log(key);

    if(this.__data[key].quantity > 1){
      this.decreaseQuantity(key);
    }
    else{
      this.nullify(key);
    }

    return this.__data[key].value;
  }

  setQuantity(key, quantity){
    if(key in this.__data && this.__data[key].value !== null){
      this.__data[key].quantity = quantity;
    } else {
      throw new Error('Key not found in cache or value is null');
    }
  }

  add(data){
    this.__data = {...this.__data, ...this.normalizeData(data)};
  }

  private

  nullify(key){
    this.__data[key].value = null;
    this.__data[key].quantity = 0;
  }

  decreaseQuantity(key) {
    this.__data[key].quantity -= 1;
  }

  add2Log(key){
    this.__log += `${key}: ${this.__data[key].value}, quantity: ${this.__data[key].quantity}\n`
  }
}
export {Cache}
