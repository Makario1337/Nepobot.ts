FROM ghcr.io/linuxserver/baseimage-alpine:3.17
LABEL maintainer="Makario1337"

ENV src=/app


RUN \
	echo "** Installing packages **" && \
	apk add  -U --upgrade --no-cache \
		git \
		sqlite-libs  \
		nodejs  \
		npm && \
	echo "** Cloning Git Repo **" && \
	mkdir -p ${src} && \
	git clone https://github.com/Makario1337/Nepobot.ts.git ${src} && \
	chgrp users ${src} && \
	chmod g+w ${src} 


# Copy local files
COPY root/ /
COPY .env /app
WORKDIR ${src}
RUN npm install .
