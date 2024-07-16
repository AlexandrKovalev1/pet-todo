import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, useAppDispatch } from "app/store";

import { BaseResponse } from "common/types/BaseResponse";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: ReturnType<typeof useAppDispatch>;
  rejectValue: { error: string } | null | BaseResponse;
}>();
