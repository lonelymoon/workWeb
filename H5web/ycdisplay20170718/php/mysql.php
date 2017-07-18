<?php

class mysql {
    private $db_host; //数据库主机
    private $db_user; //数据库用户名
    private $db_pwd; //数据库用户名密码
    private $db_database; //数据库名
    private $conn; //数据库连接标识;
    private $result; //执行query命令的结果资源标识
    private $sql; //sql执行语句
    private $row; //返回的条目数
    private $coding; //数据库编码，GBK,UTF8,gb2312
    
    /*构造函数*/
    public function __construct($db_host, $db_user, $db_pwd, $db_database, $conn, $coding) {
        $this->db_host = $db_host;
        $this->db_user = $db_user;
        $this->db_pwd = $db_pwd;
        $this->db_database = $db_database;
        $this->conn = $conn;
        $this->coding = $coding;
        $this->connect();
    }
 
    /*数据库连接*/
    public function connect() {
        if ($this->conn == "pconn") {
            //永久链接
            $this->conn = mysql_pconnect($this->db_host, $this->db_user, $this->db_pwd);
        } else {
            //即使链接
            $this->conn = mysql_connect($this->db_host, $this->db_user, $this->db_pwd);
        }
 
        if (!mysql_select_db($this->db_database, $this->conn)) {
            die("数据库不可用");
        }
        
        mysql_query("SET NAMES $this->coding");
    }
 
    /*数据库执行语句，可执行查询添加修改删除等任何sql语句*/
    public function query($sql) {
        if ($sql == "") {
            die("SQL语句错误："."SQL查询语句为空");
        }
        $this->sql = $sql;
 
        $result = mysql_query($this->sql, $this->conn);
 
        if (!$result) {
            die("错误SQL语句：".$this->sql);
        } else {
            $this->result = $result;
        }
        return $this->result;
    }

    //简化查询select
    public function selectAll($table) {
        $this->query("SELECT * FROM $table");
    }
 
    //简化查询select
    public function select($table, $columnName = "*", $condition = '' ) {
        $condition = $condition ? ' Where ' . $condition : NULL;
        $this->query("SELECT $columnName FROM $table $condition");  
    }
 
    //简化删除del
    public function delete($table, $condition) {
        if ($this->query("DELETE FROM $table WHERE $condition")) {
            return true;
        }
        return false;
    }
 
    //简化插入insert
    public function insert($table, $columnName, $value) {
        if ($this->query("INSERT INTO $table ($columnName) VALUES ($value)")) {
            return true;
        }
        return false;
    }
 
    //简化修改update
    public function update($table, $mod_content, $condition) {
        if ($this->query("UPDATE $table SET $mod_content WHERE $condition")) {
           return true;
        }
        return false;
    }

    // 根据select查询结果计算结果集条数
    public function db_num_rows() {
        if ($this->result == null) {
        	dir("result为空");
        } else {
            return mysql_num_rows($this->result);
        }
    }

 }

?>