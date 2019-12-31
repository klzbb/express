create table if not exists t_user( 
  phone varchar(11),
  password varchar(20) default null
 ) default charset = utf8;

commit;