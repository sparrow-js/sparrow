"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ice_npm_utils_1 = require("ice-npm-utils");
const storage_1 = require("./storage");
const getNpmClient = async () => {
    const originClientValue = storage_1.default.get('npmClient');
    let registry = '';
    let npmClient = originClientValue;
    if (!npmClient) {
        // set default npm client
        npmClient = await ice_npm_utils_1.checkAliInternal() ? 'tnpm' : 'npm';
        storage_1.default.set('npmClient', npmClient);
    }
    else if (npmClient === 'custom') {
        registry = storage_1.default.get('registry');
        npmClient = 'npm';
    }
    return [npmClient, registry, originClientValue];
};
exports.default = getNpmClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TnBtQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9nZXROcG1DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBaUQ7QUFDakQsdUNBQWdDO0FBRWhDLE1BQU0sWUFBWSxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQzlCLE1BQU0saUJBQWlCLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbkQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLElBQUksU0FBUyxHQUFHLGlCQUFpQixDQUFDO0lBQ2xDLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCx5QkFBeUI7UUFDekIsU0FBUyxHQUFHLE1BQU0sZ0NBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEQsaUJBQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ3JDO1NBQU0sSUFBSSxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQ2pDLFFBQVEsR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0tBQ25CO0lBQ0QsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUNsRCxDQUFDLENBQUM7QUFFRixrQkFBZSxZQUFZLENBQUMifQ==