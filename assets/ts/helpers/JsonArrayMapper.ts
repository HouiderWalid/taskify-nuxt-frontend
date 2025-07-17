import JsonMapper from "assets/ts/helpers/JsonMapper";
import JsonMapperModuleResolver from "assets/ts/helpers/JsonMapperModuleResolver";

export default class JsonArrayMapper<T> extends Array<T> {

    constructor(items: any[], Model: any) {

        items = Array.isArray(items) ? items : []
        const list = items.map((item: any) => {

            let ItemModel = Model
            if (
                Model === JsonMapperModuleResolver ||
                JsonMapperModuleResolver.isPrototypeOf(Model)
            ) {
                ItemModel = Model.getResolvedModule(item)
            }

            if (!JsonMapper.isPrototypeOf(ItemModel)) {
                return
            }

            return new ItemModel(item)
        }).filter(item => item instanceof JsonMapper)

        super(...list)
    }
}