import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

// import Select from "react-select";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
// export default function MultilineTextFields() {
//     const classes = useStyles();
//     const [currency, setCurrency] = React.useState('EUR');

//     const handleChange = (event) => {
//       setCurrency(event.target.value);
//     };

//     return (
//       <form className={classes.root} noValidate autoComplete="off">
//         <div>
//           <TextField
//             id="standard-select-currency"
//             select
//             label="Select"
//             value={currency}
//             onChange={handleChange}
//             helperText="Please select your currency"
//           >
//             {currencies.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             id="standard-select-currency-native"
//             select
//             label="Native select"
//             value={currency}
//             onChange={handleChange}
//             SelectProps={{
//               native: true,
//             }}
//             helperText="Please select your currency"
//           >
//             {currencies.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </TextField>
//         </div>
//         <div>
//           <TextField
//             id="filled-select-currency"
//             select
//             label="Select"
//             value={currency}
//             onChange={handleChange}
//             helperText="Please select your currency"
//             variant="filled"
//           >
//             {currencies.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             id="filled-select-currency-native"
//             select
//             label="Native select"
//             value={currency}
//             onChange={handleChange}
//             SelectProps={{
//               native: true,
//             }}
//             helperText="Please select your currency"
//             variant="filled"
//           >
//             {currencies.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </TextField>
//         </div>
//         <div>
//           <TextField
//             id="outlined-select-currency"
//             select
//             label="Select"
//             value={currency}
//             onChange={handleChange}
//             helperText="Please select your currency"
//             variant="outlined"
//           >
//             {currencies.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             id="outlined-select-currency-native"
//             select
//             label="Native select"
//             value={currency}
//             onChange={handleChange}
//             SelectProps={{
//               native: true,
//             }}
//             helperText="Please select your currency"
//             variant="outlined"
//           >
//             {currencies.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </TextField>
//         </div>
//       </form>
//     );
//   }

class NewTrailPage extends Component {
  constructor() {
    super();
    this.state = {
      title: [],
      description: [],
      length: [],
      city: [],

      currency: "EUR",
    };
  }

  clicked = () => {
    // return console.log(this.state.test.value);
  };

  render() {
    return (
      <>
        <div>
          <TextField
            required
            id="standard-required"
            inputRef={(c) => {
              this.state.title = c;
            }}
            label="Required"
            defaultValue="Title"
          />
          <TextField
            required
            id="standard-required"
            inputRef={(c) => {
              this.state.description = c;
            }}
            label="Required"
            defaultValue="Description"
          />
          <TextField
            required
            id="standard-required"
            inputRef={(c) => {
              this.state.length = c;
            }}
            label="Required"
            defaultValue="Length"
          />
          <TextField
            required
            id="standard-required"
            inputRef={(c) => {
              this.state.city = c;
            }}
            label="Required"
            defaultValue="City"
          />
          {/* <TextField
            id="standard-select-currency"
            select
            label="Select"
            value={currency}
            onChange={handleChange}
            helperText="Please select your currency"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField> */}
          {/* <Select options={options} />; */}
          <TextField
            id="standard-select-currency"
            select
            label="Select"
            value={this.currency}
            onChange={this.clicked}
            helperText="Please select your currency"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div onClick={this.clicked}>new trail page</div>
      </>
    );
  }
}

export default NewTrailPage;
