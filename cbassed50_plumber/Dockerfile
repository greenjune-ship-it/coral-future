FROM rocker/tidyverse:latest

# Install R packages
RUN install2.r --error \
    plumber

RUN R -e "remotes::install_github('username/repo')"