import { TextField } from "@mui/material";

const Search = (props) => {
    const { onChange, value } = props;

    return <TextField
        label='search'
        // variant="standart"
        fullWidth
        type='search'
        value={value}
        onChange={onChange}
        sx={{
            mb: '1rem'
        }}
    />

};

export default Search;