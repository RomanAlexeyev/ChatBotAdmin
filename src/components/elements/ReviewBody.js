import React from "react";
import { Button } from "primereact/button";

function ReviewBody({ data, levels, formatNumber, type }) {
  console.log(data);
  return (
    <>
      <div className="mb-4">
        <h5>Пользователь:</h5>
        <div className="flex align-items-center justify-content-between">
          <div className="flex align-items-center">
            <div
              className="mr-3"
              style={{
                display: "inline-block",
                width: 50,
                height: 50,
                background: `url(${data.photo})`,
                backgroundPosition: "50% 50%",
                backgroundSize: "cover",
                borderRadius: "50%",
              }}
            ></div>
            <h5 className="m-0">{data.name}</h5>
          </div>

          <div className="flex align-items-center telegram">
            <i className="pi pi-telegram mr-2"></i> <span>{data.telegram}</span>
          </div>
          <span className={`player-badge level-${data.level}`}>
            {levels[data.level]}
          </span>
          <span className={`points-badge level-${data.level}`}>
            {formatNumber(data.points)}
          </span>
        </div>
      </div>
      <div>
        <h5>
          {type === "resume"
            ? "Резюме:"
            : type === "posts"
            ? "Посты:"
            : type === "groups"
            ? "Группы:"
            : ""}
        </h5>
        {type === "resume" && (
          <div
            className="flex align-items-center justify-content-between"
            style={{ width: "50%" }}
          >
            <a
              href={data.for_moderation.resume.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex align-items-center"
            >
              <i className="pi pi-file-pdf mr-2"></i>{" "}
              <span>{data.for_moderation.resume.filename}</span>
            </a>
          </div>
        )}

        {type === "posts" && (
          <div>
            {data.for_moderation.posts.map((post) => {
              return (
                <div className="flex align-items-center justify-content-between mb-3">
                  <div className="col-6">
                    {" "}
                    <a
                      key={post.id}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.link}
                    </a>
                  </div>

                  <Button
                    label="Начислить 100 баллов"
                    icon="pi pi-check"
                    className="p-button-sm"
                  />
                </div>
              );
            })}
          </div>
        )}

        {type === "groups" && (
          <div>
            {data.for_moderation.groups.map((group) => {
              return (
                <div className="flex align-items-center justify-content-between mb-3">
                  <div className="col-6">
                    {" "}
                    <a
                      key={group.id}
                      href={group.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {group.link}
                    </a>
                  </div>

                  <Button
                    label="Начислить 100 баллов"
                    icon="pi pi-check"
                    className="p-button-sm"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default ReviewBody;
