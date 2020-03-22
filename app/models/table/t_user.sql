# 用户表
create table if not exists t_user( 
  id INT UNSIGNED AUTO_INCREMENT,
  account varchar(11),
  act_name varchat(11),
  phone varchar(11),
  password varchar(20) default null,
  PRIMARY KEY(id)
 ) default charset = utf8;

commit;