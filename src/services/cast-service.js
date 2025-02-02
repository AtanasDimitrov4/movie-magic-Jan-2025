import Cast from "../models/Cast.js";

export default {
    getAll(filter = {}) {
        let query = Cast.find({});

        if (filter.exclude) {
            query = query.find({id: {$nin: filter.exclude}});
            // query = query.nin('id', filter.exclude);
        }

        return query;
    },
    create(castData) {
      
       return Cast.create(castData);
      
    }
}