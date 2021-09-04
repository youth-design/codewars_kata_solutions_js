const query = function() {
    let rawData = [];

    let callMethods = {
        where: [],
    };

    const methods = {
        select: (cb) => {
            if(callMethods['select']) {
                throw new Error('Duplicate SELECT');
            }
            callMethods['select'] = () => rawData.map(cb ? cb :  i => i);
            return methods;
        },
        from: (...args) => {
            if(callMethods['from']) {
                throw new Error('Duplicate FROM');
            }
            callMethods['from'] = () => {
                if(args.length === 1) {
                    rawData = args[0];
                } else {
                    for(let i = 0; i < args[0].length; i++) {
                        for(let j = 0; j < args[1].length; j++) {
                            rawData.push([args[0][i], args[1][j]]);
                        }
                    }
                }
            };
            return methods;
        },
        where: (...args) => {
            callMethods['where'] = [
                ...callMethods.where,
                () => rawData.filter(i => {
                    return args ? args.reduce((flag, cb) => !flag ? cb(i) : flag, false) : () => true
                }),
            ];
            return methods;
        },
        orderBy: cb => {
            if(callMethods['orderBy']) {
                throw new Error('Duplicate ORDERBY');
            }
            callMethods['orderBy'] = () => rawData.sort(cb);
            return methods;
        },
        having: cb => {
            callMethods['having'] = () => rawData.filter(cb);
            return methods;
        },
        groupBy: (...args) => {
            if(callMethods['groupBy']) {
                throw new Error('Duplicate GROUPBY');
            }
            callMethods['groupBy'] = () => {
                const res = [];
                rawData.map(item => {
                    const fields = args.map(cb => cb(item));
                    let label = res;
                    fields.forEach((field, ind) => {
                        if(fields.length === 1) {
                            if(label.find(i => i[0] === field)) {
                                label.find(i => i[0] === field)[1].push(item);
                            } else {
                                label.push([field, [item]]);
                            }
                            return;
                        }
                        if(ind === fields.length - 1) {
                            if(label.find(i => i[0] === field)) {
                                label.find(i => i[0] === field)[1].push(item);
                            } else {
                                label.push([field, [item]]);
                            }
                        } else {
                            if(label.find(i => i[0] === field)) {
                                label = label.find(i => i[0] === field)[1];
                            } else {
                                label.push([field, []]);
                                label = label.find(i => i[0] === field)[1];
                            }
                        }
                    })
                })

                // console.log('RES:::::', JSON.stringify(res));
                return res;

            }
            return methods;
        },
        execute: () => {
            if(callMethods.from) {
                callMethods.from();
            }

            callMethods.where.forEach((func) => {
                rawData = func();
            });

            if(callMethods.groupBy) {
                rawData = callMethods.groupBy();
                if(callMethods.having) {
                    rawData = callMethods.having();
                }
            }

            if(callMethods.select) {
                rawData = callMethods.select();
            }


            if(callMethods.orderBy) {
                callMethods.orderBy();
            }


            callMethods = {
                where: []
            };
            const res =[...rawData];
            rawData.splice();

            return res;
        },
    }

    return methods;
};

module.exports = { query };