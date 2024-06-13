/**
 * @param {object} obj - input object that has any depth of nested objects
 * @returns {object} result - output object which has one level of depth
 * 
 * @example
 * var obj = {
 *  prop: 'value',
 *  prop1: { 
 *      value1: 'value1',
 *  },
 *  prop2: {
 *      value3: { prop3: 'value4' },
 *      value5: ['1', '2', '3],
 *  }
 * }
 * flatten(obj);
 * 
 * Returns:
 * {
 *     prop: 'value',
 *     prop1.value1: 'value1',
 *     prop2.value3.prop3: 'value4',
 *     prop2.value5.[0]: '1',
 *     prop2.value5.[1]: '2',
 *     prop2.value5.[2]: '3',
 * }
 *  */
function flatten(obj) {
    let result = {};
    const entries = Object.entries(obj);
    entries.forEach(([key, value]) => {
        if (typeof value === 'string') {
            result = {
              ...result,
              ...({ [key]: value })
            };

        } else if (Array.isArray(value)) {
            const reduced = value.reduce((res, v, i) => {
                res[`${key}.[${i}]`] = v;
                return res;
            }, {});

            result = {
                ...result,
                ...reduced,
            }
        } else if (typeof value === 'object') {
            const newObj = flatten(value);
            const keys = Object.keys(newObj);
            const reduced = keys.reduce((res, k) => {
                res = {
                  ...res,
                  ...({[`${key}.${k}`]: newObj[k]}),
                };
              return res;
            }, {});

            result = {
                ...result,
                ...reduced,
            }
        }
    });
    return result;
}
