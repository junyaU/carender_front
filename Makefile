build:
	docker-compose build
stop:
	docker-compose stop; docker-compose down
ps:
	docker-compose ps
start:
	docker-compose up
exec:
	docker exec -it calender_front_calender-front_1 sh