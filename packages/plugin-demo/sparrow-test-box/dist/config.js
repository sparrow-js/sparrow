"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    model: {
        attr: {
            direction: "",
            'content-position': '',
        },
        custom: {
            label: '输入文本',
        },
    },
    schema: {
        fields: [
            {
                type: 'object',
                label: '',
                model: 'attr',
                schema: {
                    fields: [
                        {
                            type: "select",
                            label: "direction",
                            model: "direction",
                            multi: true,
                            values: ["horizontal", "vertical", ""]
                        },
                        {
                            type: "select",
                            label: "content-position",
                            model: "content-position",
                            multi: true,
                            values: ["left", "right", "center", ""]
                        },
                    ]
                }
            },
            {
                type: 'object',
                label: '',
                model: 'custom',
                schema: {
                    fields: [
                        {
                            type: "input",
                            inputType: "text",
                            label: "label",
                            model: "label"
                        }
                    ]
                }
            }
        ]
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFlO0lBQ2IsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFO1lBQ0osU0FBUyxFQUFFLEVBQUU7WUFDYixrQkFBa0IsRUFBRSxFQUFFO1NBQ3ZCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLE1BQU07U0FDZDtLQUNGO0lBQ0QsTUFBTSxFQUFFO1FBQ04sTUFBTSxFQUFFO1lBQ047Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFO29CQUNOLE1BQU0sRUFBRTt3QkFDTjs0QkFDRSxJQUFJLEVBQUUsUUFBUTs0QkFDZCxLQUFLLEVBQUUsV0FBVzs0QkFDbEIsS0FBSyxFQUFFLFdBQVc7NEJBQ2xCLEtBQUssRUFBRSxJQUFJOzRCQUNYLE1BQU0sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDO3lCQUN2Qzt3QkFDRDs0QkFDRSxJQUFJLEVBQUUsUUFBUTs0QkFDZCxLQUFLLEVBQUUsa0JBQWtCOzRCQUN6QixLQUFLLEVBQUUsa0JBQWtCOzRCQUN6QixLQUFLLEVBQUUsSUFBSTs0QkFDWCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUM7eUJBQ3hDO3FCQUNGO2lCQUNGO2FBQ0Y7WUFDRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsUUFBUTtnQkFDZixNQUFNLEVBQUU7b0JBQ04sTUFBTSxFQUFFO3dCQUNOOzRCQUNFLElBQUksRUFBRSxPQUFPOzRCQUNiLFNBQVMsRUFBRSxNQUFNOzRCQUNqQixLQUFLLEVBQUUsT0FBTzs0QkFDZCxLQUFLLEVBQUUsT0FBTzt5QkFDZjtxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUEifQ==