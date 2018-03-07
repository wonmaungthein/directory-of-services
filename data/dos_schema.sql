PRAGMA foreign_keys = ON;

-- ORGANISATION

create table organisation (
    org_id 								integer primary key,
    org_name 								varchar,
    website 								varchar,
    email_address 							varchar,
    telephone 								varchar
);

-- BRANCH

create table branch (
	branch_id 							varchar not null primary key,
	org_id 								varchar not null,
	borough 							varchar,
	foreign key(org_id) 					references organisation(org_id)
);

-- SERVICE

create table service (
	branch_id 							varchar not null,
	service_name 							varchar,
	service_days 							varchar not null,
	process 							varchar not null,
	foreign key(branch_id) 					references branch(branch_id)
);



-- ADRESS

create table adress (
	adress_id 							varchar primary key,
	branch_id 							varchar not null,
	adress_line 						varchar,
	city 								varchar,
	postcode 							varchar,
	foreign key(branch_id) 					references branch(branch_id)
);

-- LOCATION

create table location (
	adress_id 							varchar not null,
	lat 								varchar,
	lng 								varchar,
	foreign key(adress_id) 					references adress(adress_id)
);
