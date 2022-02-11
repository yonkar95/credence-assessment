

var dbConn  = require('../db');

exports.create = async (req, res) => {
  req.body.Net_sal=req.body.Basic*1+req.body.Allowance*1-req.body.Deduction*1;
  let formdata = req.body;
  dbConn.query('INSERT INTO emp SET ?', formdata, function(err,result) {
    let status="200";
    let data={};
    let message='';
    if(err)
    {
      message="Record not added";
      status="400";
      data={ success: false, message: message }
    } 
    else {
      data={ success: true, data: formdata }
    }
    res
            .status(status)
            .json(data);
  })
};

  exports.getOne = async (req, res) => {
    let id = req.params.id;
    dbConn.query('SELECT * FROM emp WHERE Empid = ' + id, function(err, rows, fields) {
      if(err) throw console.log(err)
      //  console.log(rows);
      // if user not found
      let status="200";
      let data={};
      if (rows.length <= 0) {
        let message="Record Not Found";
        status="404";
        data={ success: false, message: message }
      }
      else {
        data={ success: true, data: rows[0] }
      }
      res
              .status(status)
              .json(data);
    })
  };

  exports.getAll = async (req, res) => {
    dbConn.query('SELECT * FROM emp WHERE Empid ', function(err, rows, fields) {
      if(err) throw console.log(err)
      //  console.log(rows);
      // if user not found
      let status="200";
      let data={};
      if (rows.length <= 0) {
        let message="Record Not Found";
        status="404";
        data={ success: false, message: message }
      }
      else {
        data={ success: true,count:rows.length, data: rows }
      }
      res
              .status(status)
              .json(data);
    })
  };


  exports.update = async (req, res) => {
    let id = req.params.id;
    req.body.Net_sal=req.body.Basic*1+req.body.Allowance*1-req.body.Deduction*1;
    let formdata = req.body;
    dbConn.query('UPDATE emp SET ? WHERE Empid = ' + id, formdata, function(err,result) {
      let status="200";
      let data={};
      let message='';
      if(err)
      {
        message="Record not updated";
        status="400";
        data={ success: false, message: message }
      } 
      else {
        data={ success: true, data: formdata }
      }
      res
              .status(status)
              .json(data);
    })
  };

  exports.delete = async (req, res) => {
    let id = req.params.id;
    dbConn.query('DELETE FROM emp WHERE Empid = ' + id, function(err,result) {
      let status="200";
      let data={};
      let message='';
      if(err)
      {
        message="Record not deleted";
        status="400";
        data={ success: false, message: message }
      } 
      else {
        data={ success: true, message: 'Record deleted successfully' }
      }
      res
              .status(status)
              .json(data);
    })
  };