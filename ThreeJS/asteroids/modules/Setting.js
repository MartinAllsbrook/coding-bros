export default class Setting {
    settingValue;
    callbacks = [];

    constructor(defaultValue){
        this.settingValue = defaultValue;
    }

    // Change the setting and call callbacks
    changeSetting(newValue){
        this.settingValue = newValue;
        this.callbacks.forEach(callback => callback(newValue));
    }

    // Add a callback (function) to fire when the setting changes
    subscribe(callback){
        this.callbacks.push(callback);
    }
}
