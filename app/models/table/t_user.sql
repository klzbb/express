create table if not exists t_user( 
  uid varchar(16) primary key, 
  name varchar(16),  
  sex varchar(1)
 ) default charset = utf8;

commit;