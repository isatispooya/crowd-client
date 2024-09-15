/* eslint-disable react/no-danger */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import {
  Accordion,
  Typography,
  FormControl,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import { ParsHTML } from "../../../utils/parsHTML";

const DropDown = ({ tab }) => {
  const [expanded, setExpanded] = useState(null);

  if (!tab.Contentdrop || tab.Contentdrop.length === 0) {
    return null;
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.quizBox}>
        {tab.Contentdrop.map((q, index) => (
          <Accordion
            key={index}
            style={styles.accordion}
            expanded={expanded === index}
            onChange={handleChange(index)}
            sx={{ backgroundColor: "#f9f9f9", boxShadow: 2, borderRadius: 2 }}
          >
            <AccordionSummary
              expandIcon={
                expanded === index ? (
                  <RiArrowDropUpLine style={styles.icon} />
                ) : (
                  <RiArrowDropDownLine style={styles.icon} />
                )
              }
              sx={{ padding: "0 16px" }}
            >
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
                    {q.Title}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "16px", backgroundColor: "#fff", fontSize: '16px' }}>
              <FormControl component="fieldset">
                <div dangerouslySetInnerHTML={ParsHTML(q.Summer)} />
              </FormControl>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
    overflowY: "auto",
  },
  quizBox: {
    width: "100%",
    maxWidth: "1000px",
    textAlign: "right",
  },
  accordion: {
    marginBottom: "15px",
    borderRadius: "8px",
  },
  icon: {
    fontSize: "2rem",
    color: "#1976d2",
  },
};

DropDown.propTypes = {
  tab: PropTypes.shape({
    Contentdrop: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Summer: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default DropDown;
