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
	mkdir -p ${src} && \
	chgrp users ${src} && \
	chmod g+w ${src} 


# Copy local files
COPY root/ /
COPY .env /app
WORKDIR ${src}

