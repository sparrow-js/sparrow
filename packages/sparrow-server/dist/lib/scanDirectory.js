"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const pathExists = require("path-exists");
const util = require("util");
const junk = require("junk");
const _ = require("lodash");
const readdirAsync = util.promisify(fs.readdir);
const lstatAsync = util.promisify(fs.lstat);
const accessAsync = util.promisify(fs.access);
/**
 * Given a directory, scan the directory below
 *
 * @param directoryPath
 */
exports.default = async (directoryPath) => {
    const isExist = await pathExists(directoryPath);
    if (!isExist) {
        throw new Error(`${directoryPath} is not exist.`);
    }
    const files = await readdirAsync(directoryPath);
    const targetFiles = [];
    await Promise.all(files.map(async (filename) => {
        const targetPath = path.join(directoryPath, filename);
        let stats;
        try {
            stats = await lstatAsync(targetPath);
        }
        catch (err) {
            console.warn('lstatAsync got error:', err);
        }
        const isDirectory = stats &&
            stats.isDirectory() &&
            junk.not(filename) &&
            filename.indexOf('.') !== 0;
        if (isDirectory) {
            try {
                await accessAsync(targetPath, fs.constants.R_OK);
                targetFiles.push(filename);
            }
            catch (error) {
                console.warn('accessAsync got error:', error);
            }
        }
    }));
    return _.orderBy(targetFiles);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbkRpcmVjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2NhbkRpcmVjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIsMENBQTBDO0FBQzFDLDZCQUE2QjtBQUM3Qiw2QkFBNkI7QUFDN0IsNEJBQTRCO0FBRTVCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2hELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTlDOzs7O0dBSUc7QUFDSCxrQkFBZSxLQUFLLEVBQUUsYUFBcUIsRUFBcUIsRUFBRTtJQUNoRSxNQUFNLE9BQU8sR0FBRyxNQUFNLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLGFBQWEsZ0JBQWdCLENBQUMsQ0FBQztLQUNuRDtJQUVELE1BQU0sS0FBSyxHQUFHLE1BQU0sWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN2QixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO1FBQ3JELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSTtZQUNGLEtBQUssR0FBRyxNQUFNLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN0QztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM1QztRQUVELE1BQU0sV0FBVyxHQUFHLEtBQUs7WUFDdkIsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUNsQixRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixJQUFJLFdBQVcsRUFBRTtZQUNmLElBQUk7Z0JBQ0YsTUFBTSxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pELFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDNUI7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQy9DO1NBQ0Y7SUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQyJ9