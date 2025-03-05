package com.synergy.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;


import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import jakarta.persistence.OrderBy;


@Entity @Getter @Setter
@DynamicInsert @DynamicUpdate
@NoArgsConstructor @AllArgsConstructor
public class Chatroom {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @OnDelete(action = OnDeleteAction.CASCADE)
    private User user1;

    @ManyToOne @OnDelete(action = OnDeleteAction.CASCADE)
    private User user2;

    @OneToMany(mappedBy = "room", fetch = FetchType.EAGER)
    @OrderBy("sendDate asc")
    private List<Message> messages = new ArrayList<>();
    
}
