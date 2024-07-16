export type BaseResponse<D = {}> = {
	resultCode: number;
	messages: string[];
	fieldsErrors?: { field: string; error: string }[];
	data: D;
};
