import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type State = {
  imageUri: string;
  imageUris: string[];
};

const initialState: State = {
  imageUri: '',
  imageUris: [],
};

const pictureSlice = createSlice({
  name: 'uris',
  initialState,
  reducers: {
    setPictureUri: (state, action: PayloadAction<string>) => ({
      ...state,
      imageUri: action.payload,
    }),
    setPictureUris: (state, action: PayloadAction<string[]>) => ({
      ...state,
      imageUris: action.payload,
    }),
  },
});

export const {setPictureUri, setPictureUris} = pictureSlice.actions;
export default pictureSlice.reducer;
