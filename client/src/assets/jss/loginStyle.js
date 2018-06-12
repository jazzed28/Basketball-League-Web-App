const loginStyle = theme => ({
  root: {
    flexGrow: 1,
    fontFamily: theme.typography.fontFamily,
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
  cardHeader: {
    boxShadow:
    "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)",
    color: "#fff",
    background: "linear-gradient(60deg, #D59300, #FF9300)",
    width: "10rem",
    height: "10rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "Center",
    textAlign: "center",
    borderRadius: "10rem",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "-5rem",
    padding: "20px 0",
    marginBottom: "15px",
  },
  cardContent: {
    padding: "0.9375rem 1.875rem",
    flex: "1 1 auto"
  },
  cardActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    padding: "0.9375rem 1.875rem"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    overflow: "visible",
    border: "0",
    marginBottom: "30px",
    marginTop: "8rem",
    paddingBottom: "30px",
    borderRadius: "6px",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff",
    width: "100%",
    boxShadow:
      "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem",
    transition: "all 300ms linear",
  },
  formControl: {
    paddingBottom: "7px",
    margin: "11px 0 0 0",
    position: "relative"
  },
  form: {
    margin: "0"
  },
  title: {
    marginBottom: 16,
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase"
  },
  pos: {
    marginBottom: 12,
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center"
  }
});

export default loginStyle;