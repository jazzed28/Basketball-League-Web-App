import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow, Input, TextField, Paper, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginBottom: theme.spacing.unit * 3
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  gridContainer: {
    marginTop: "30px",
    marginBottom: "50px"
  },
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    "@media (min-width: 576px)": {
      maxWidth: "540px"
    },
    "@media (min-width: 768px)": {
      maxWidth: "720px"
    },
    "@media (min-width: 992px)": {
      maxWidth: "960px"
    },
    "@media (min-width: 1200px)": {
      maxWidth: "1140px"
    }
  },
  inputNum: {
    maxWidth: "30px"
  },
  input: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
    maxWidth: "500px"
  },
});

var rosterData = [
  {
      number: "2",
      firstname: "Peter",
      lastname: "Son",
      email: "email1@gmail.com",
      mobile: "0213892833",
  },
  {
      number: "5",
      firstname: "Richard",
      lastname: "Wang",
      email: "email2@gmail.com",
      mobile: "021123492833",
  },
  {
      number: "6",
      firstname: "Tony",
      lastname: "Ju",
      email: "email3@gmail.com",
      mobile: "021389232",
  },
  {
      number: "1",
      firstname: "Jin",
      lastname: "Doj",
      email: "email4@gmail.com",
      mobile: "2342434",
  },
  {
      number: "3",
      firstname: "Derek",
      lastname: "Pin",
      email: "email5@gmail.com",
      mobile: "234523",
  },
  {
      number: "4",
      firstname: "Wan",
      lastname: "Todi",
      email: "email6@gmail.com",
      mobile: "213415",
  },{
      number: "7",
      firstname: "Won",
      lastname: "Bay",
      email: "emai7@gmail.com",
      mobile: "3765",
  },
  {
      number: "8",
      firstname: "Create",
      lastname: "Fj",
      email: "email8@gmail.com",
      mobile: "345635346",
  },
  {
      number: "9",
      firstname: "Doli",
      lastname: "Nemo",
      email: "email9@gmail.com",
      mobile: "456546",
  },
  {
      number: "10",
      firstname: "Pop",
      lastname: "Culture",
      email: "emai10@gmail.com",
      mobile: "2375646",
  },
  {
      number: "11",
      firstname: "Thomas",
      lastname: "Su",
      email: "email11@gmail.com",
      mobile: "2345345",
  },
  {
      number: "12",
      firstname: "John",
      lastname: "Mand",
      email: "email12@gmail.com",
      mobile: "45746",
  }
]

const initailState = {
  teamid: "",
  teamname: "OBAR",
  players: rosterData,
  note: ""
};

class Roster extends Component {
  constructor(){
    super();
    this.state = initailState;
    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
  }

  componentDidMount(){
    axios.get(`/api/teams/${this.state.teamname}`)
        .then((response) => {
          console.log("get response: ");
          console.log(response.data);
          if(response.status === 200){
            // update the state to redirect to home
            this.setState({
              teamid: response.data._id,
              teamname: response.data.teamname,
              players: response.data.players,
              note: response.data.note
            })
          }
        }).catch(err => {
          console.log("get error: ");
          console.log(err);
        })
  }

  handleChange(i, event){
    console.log("CHANGING ROW: ", i);
    var arr = this.state.players;
    arr[i][event.target.name] = event.target.value;
    this.setState({
      players: arr
    })
  }

  handleChangeNote(event){
    console.log("NOTE CHANGING");
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted");
    axios.put(`/api/teams/${this.state.teamid}`,
        { players: this.state.players })
        .then((res) => {
          if (!res.data.loginSuccess) {
            console.log("front login failed");
            this.props.history.push(res.data.redirectUrl);
          } else {
            console.log("Saved successfully", res);
            this.props.history.push('/roster');
          }
        })
  }

  render(){
    const { classes } = this.props;
    console.log(this.state.players);

    return(
      <div className={classes.container}>
        <form onSubmit={this.handleSubmit}>
          <Grid className={classes.gridContainer} container justify="space-between" alignItems="center">
            <Grid item ><h2>{this.state.teamname}</h2></Grid>
            <Grid item >
              <Button variant="outlined" color="primary" size="large">
                Note
              </Button>
              <Button type="submit" variant="raised" color="secondary" size="large">
                Submit
              </Button>
            </Grid>
          </Grid>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell numeric>No.</CustomTableCell>
                  <CustomTableCell>Firstname</CustomTableCell>
                  <CustomTableCell>Lastname</CustomTableCell>
                  <CustomTableCell>Email</CustomTableCell>
                  <CustomTableCell>Mobile</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.players.map((player, i) => (
                  <TableRow className={classes.row} key={i}>
                    <CustomTableCell numeric>
                      <Input
                        disableUnderline
                        type="number"
                        name="number"
                        value={player.number}
                        onChange={this.handleChange.bind(this, i)}
                        className={classes.inputNum}
                        inputProps={{
                          'aria-label': 'Number',
                          min: "0",
                          max: "99",
                          step: "1"
                        }}
                      />
                    </CustomTableCell>
                    <CustomTableCell>
                      <Input
                        disableUnderline
                        type="string"
                        name="firstname"
                        value={player.firstname}
                        onChange={this.handleChange.bind(this, i)}
                        className={classes.input}
                        inputProps={{
                          'aria-label': 'Firstname',
                        }}
                      />
                    </CustomTableCell>
                    <CustomTableCell>
                      <Input
                        disableUnderline
                        type="string"
                        name="lastname"
                        value={player.lastname}
                        onChange={this.handleChange.bind(this, i)}
                        className={classes.input}
                        inputProps={{
                          'aria-label': 'Lastname',
                        }}
                      />
                    </CustomTableCell>
                    <CustomTableCell>
                      <Input
                        disableUnderline
                        type="string"
                        name="email"
                        value={player.email}
                        onChange={this.handleChange.bind(this, i)}
                        className={classes.input}
                        inputProps={{
                          'aria-label': 'Email',
                        }}
                      />
                    </CustomTableCell>
                    <CustomTableCell>
                      <Input
                        disableUnderline
                        type="string"
                        name="mobile"
                        value={player.mobile}
                        onChange={this.handleChange.bind(this, i)}
                        className={classes.input}
                        inputProps={{
                          'aria-label': 'Mobile',
                        }}
                      />
                    </CustomTableCell>
                  </TableRow>
                ))}
                  
              </TableBody>
            </Table>
          </Paper>
          <Grid className={classes.gridContainer} container justify="space-between" alignItems="center">
            <Grid item style={{width: "calc(100% - 150px)"}}>
              <TextField
                id="multiline-static"
                label="Note"
                multiline
                rows="4"
                placeholder="Please make a note here"
                name="note"
                value={this.state.note}
                onChange={this.handleChangeNote}
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="raised" color="secondary" size="large">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}

Roster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Roster));