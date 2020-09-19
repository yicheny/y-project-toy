//基于localStorage封装的一系列操作方法

class LS {
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // append(key, appendData) {
    //     const data = this.get(key);
    //     if (!Array.isArray(data)) return this.set(key, [appendData]);
    //     data.push(appendData);
    //     this.set(key, data);
    // }

    appendWithUpdate(baseKey,appendKey,appendData){
        const data = this.get(appendKey);
        if (!Array.isArray(data)) return this.set(appendKey, [appendData]);

        const item = data.find(x=>x[baseKey] === appendData[baseKey]);
        if(item){
            data.splice(data.indexOf(item),1,appendData)
        }else{
            data.push(appendData);
        }

        this.set(appendKey, data);
    }
}

export const ls = new LS();
