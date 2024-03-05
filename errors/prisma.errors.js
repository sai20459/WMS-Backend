const { Prisma } = require("@prisma/client");

const toPrismaError = (originalError) => {
  switch (originalError.code) {
    case "P2000":
      return "The provided value for the column is too long for the column's type.";
    case "P2001":
      return "The record searched for in the where condition does not exist";
    case "P2002":
      return "Unique constraint failed";
    case "P2003":
      return "Foreign key constraint failed";
    case "P2004":
      return "A constraint failed on the database";
    case "P2005":
      return "The value stored in the database is invalid for the field's type";
    case "P2006":
      return "The provided value is not valid";
    case "P2007":
      return "Data validation error";
    case "P2008":
      return "Failed to parse the query";
    case "P2009":
      return "Failed to validate the query";
    case "P2010":
      return "Raw query failed";
    case "P2011":
      return "Null constraint violation";
    case "P2012":
      return "Missing a required value";
    case "P2013":
      return "Missing the required argument";
    case "P2014":
      return "The change you are trying to make would violate the required relation";
    case "P2015":
      return "A related record could not be found";
    case "P2016":
      return "Query interpretation error";
    case "P2017":
      return "The records for the relation are not connected";
    case "P2018":
      return "The required connected records were not found";
    case "P2019":
      return "Input error";
    case "P2020":
      return "Value out of range for the type";
    case "P2021":
      return "The table does not exist in the current database";
    case "P2022":
      return "The column does not exist in the current database";
    case "P2023":
      return "Inconsistent column data";
    case "P2024":
      return "Timed out fetching a new connection from the connection pool";
    case "P2025":
      return "An operation failed because it depends on one or more records that were required but not found";
    case "P2026":
      return "The current database provider doesn't support a feature that the query used";
    case "P2027":
      return "Multiple errors occurred on the database during query execution";
    case "P2030":
      return "Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema";
    default:
      return originalError.message;
  }
};

const isPrismaClientError = (error) =>
  error instanceof Prisma.PrismaClientKnownRequestError;

module.exports = {
  toPrismaError,
  isPrismaClientError,
};
