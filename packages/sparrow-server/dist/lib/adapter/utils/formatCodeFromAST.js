"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("@babel/generator");
const prettier = require("prettier");
exports.default = (ast) => {
    return prettier.format(generator_1.default(ast, {
        retainLines: true,
    }).code, {
        singleQuote: true,
        trailingComma: 'es5',
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0Q29kZUZyb21BU1QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXIvdXRpbHMvZm9ybWF0Q29kZUZyb21BU1QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBd0M7QUFDeEMscUNBQXFDO0FBRXJDLGtCQUFlLENBQUMsR0FBUSxFQUFVLEVBQUU7SUFDbEMsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLG1CQUFRLENBQUMsR0FBRyxFQUFFO1FBQ25DLFdBQVcsRUFBRSxJQUFJO0tBQ2xCLENBQUMsQ0FBQyxJQUFJLEVBQUU7UUFDUCxXQUFXLEVBQUUsSUFBSTtRQUNqQixhQUFhLEVBQUUsS0FBSztLQUNyQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==