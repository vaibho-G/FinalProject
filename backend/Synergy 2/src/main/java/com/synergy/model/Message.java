package com.synergy.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import java.time.LocalDateTime;

@Entity @Getter @Setter
@DynamicInsert @DynamicUpdate
@NoArgsConstructor @AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Message {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore @ManyToOne @JoinColumn(name = "room_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Chatroom room;

    @ManyToOne @OnDelete(action = OnDeleteAction.CASCADE)
    private User sender;

    private String content;

    @JsonIgnore @ManyToOne @OnDelete(action = OnDeleteAction.CASCADE)
    private User visible;

    @CreatedDate
    private LocalDateTime sendDate;

}
